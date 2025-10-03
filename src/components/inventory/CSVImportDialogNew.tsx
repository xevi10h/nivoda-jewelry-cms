import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileSpreadsheet, Loader2, CheckCircle2, XCircle } from "lucide-react";
import Papa from "papaparse";
import { toast } from "@/hooks/use-toast";
import { useCreateJewellery } from "@/hooks/use-jewellery";
import { csvRowToJewelleryInput } from "@/helpers/csv-to-jewellery";
import { Progress } from "@/components/ui/progress";

interface CSVImportDialogNewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: () => void;
}

export const CSVImportDialogNew = ({ open, onOpenChange, onImport }: CSVImportDialogNewProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<{ total: number; success: number; failed: number } | null>(null);

  const { createJewellery } = useCreateJewellery();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStats(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setStats({ total: 0, success: 0, failed: 0 });

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        const rows = results.data as any[];
        const total = rows.length;

        setStats({ total, success: 0, failed: 0 });

        let success = 0;
        let failed = 0;

        // Process rows in batches of 10
        const batchSize = 10;
        for (let i = 0; i < rows.length; i += batchSize) {
          const batch = rows.slice(i, i + batchSize);

          const results = await Promise.allSettled(
            batch.map(async (row) => {
              const input = csvRowToJewelleryInput(row);
              if (!input) {
                throw new Error('Failed to parse row');
              }
              return createJewellery(input);
            })
          );

          results.forEach(result => {
            if (result.status === 'fulfilled') {
              success++;
            } else {
              failed++;
              console.error('Import error:', result.reason);
            }
          });

          setStats({ total, success, failed });
          setProgress(((i + batchSize) / total) * 100);
        }

        setIsProcessing(false);

        if (failed === 0) {
          toast({
            title: "Import successful",
            description: `Successfully imported ${success} items.`,
          });
          onImport();
          onOpenChange(false);
          setFile(null);
          setStats(null);
        } else {
          toast({
            title: "Import completed with errors",
            description: `Imported ${success} items, ${failed} failed.`,
            variant: "destructive",
          });
        }
      },
      error: (error) => {
        toast({
          title: "Import failed",
          description: `Could not read the CSV file: ${error.message}`,
          variant: "destructive",
        });
        setIsProcessing(false);
      },
    });
  };

  const downloadTemplate = () => {
    const template = `Nivoda Stock ID,Nivoda Unique SKU,Product Name,Product Description,Ring Type,Option 1 Value,Option 2 Value,Metal Weight,Band Width,Number of Stones,Number of Side Stones,Total Cttw of Side Stones,Accent Stones,Natural Stone Colour/ Clarity,Labgrown Stone Colour/ Clarity,Natural Variant Price,Labgrown Variant Price,Shopify Ring Style,Ring Style - Tag 1,Ring Style - Tag 2,Ring Style - Tag 3,Setting Type,Band Style,Image Src,Variant front view image,Variant side view image,Variant angled view image,Variant Image,V360 url
NIV-001,SKU-001,Classic Solitaire Diamond Ring,Elegant solitaire ring with round brilliant diamond,Engagement Rings,14KT White Gold,Round,3.5,2.0,1ST,32,1.5,Yes,D/VVS1,E/VVS2,5999,3499,SOLITAIRE,Classic,Modern,,,Four Prong,Straight,,,,,, `;

    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shopify-jewelry-template.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Template downloaded",
      description: "CSV template has been downloaded successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Import Jewelry Items from CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={downloadTemplate}
              className="w-full"
              disabled={isProcessing}
            >
              <Download className="w-4 h-4 mr-2" />
              Download CSV Template
            </Button>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isProcessing}
                />
                <Button variant="secondary" asChild disabled={isProcessing}>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Select CSV File
                  </span>
                </Button>
              </label>
              {file && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>

          {isProcessing && stats && (
            <div className="space-y-3">
              <Progress value={progress} className="w-full" />
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-medium">{stats.total}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Success:
                  </span>
                  <span className="font-medium">{stats.success}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span className="flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    Failed:
                  </span>
                  <span className="font-medium">{stats.failed}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || isProcessing}
              className="flex-1"
            >
              {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isProcessing ? "Importing..." : "Import"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Imports will be processed in batches for better performance</p>
            <p>• The format should match the Shopify export format</p>
            <p>• Invalid rows will be skipped and reported as failed</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
