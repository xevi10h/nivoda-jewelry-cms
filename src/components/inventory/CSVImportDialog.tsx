import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileSpreadsheet } from "lucide-react";
import { JewelryItem } from "@/types/jewelry";
import Papa from "papaparse";
import { toast } from "@/hooks/use-toast";

interface CSVImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (items: JewelryItem[]) => void;
}

export const CSVImportDialog = ({ open, onOpenChange, onImport }: CSVImportDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to import.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const items: JewelryItem[] = results.data.map((row: any, index: number) => ({
            id: Date.now().toString() + index,
            nivodaStockId: row.nivodaStockId || "",
            uniqueSKU: row.uniqueSKU || "",
            supplierCode: row.supplierCode || "",
            name: row.name || "",
            description: row.description || "",
            type: row.type || "",
            published: row.published === "true" || row.published === "TRUE",
            naturalVariantPrice: parseFloat(row.naturalVariantPrice) || 0,
            labgrownVariantPrice: parseFloat(row.labgrownVariantPrice) || 0,
            metalWeight: parseFloat(row.metalWeight) || 0,
            bandWidth: parseFloat(row.bandWidth) || 0,
            numberOfSideStones: parseInt(row.numberOfSideStones) || 0,
            totalCttw: parseFloat(row.totalCttw) || 0,
            ringStyle: row.ringStyle ? row.ringStyle.split(";") : [],
            ringType: row.ringType || "",
            mountStyle: row.mountStyle || "",
            headType: row.headType || "",
            bandShape: row.bandShape || "",
            settingType: row.settingType || "",
            finish: row.finish || "",
            bandStyle: row.bandStyle || "",
            option1Name: row.option1Name || "",
            option1Value: row.option1Value || "",
            option2Name: row.option2Name || "",
            option2Value: row.option2Value || "",
            naturalColour: row.naturalColour || "",
            naturalClarity: row.naturalClarity || "",
            labgrownColour: row.labgrownColour || "",
            labgrownClarity: row.labgrownClarity || "",
            images: row.images ? row.images.split(";") : [],
            thumbnails: row.thumbnails ? row.thumbnails.split(";") : [],
            video360Url: row.video360Url || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }));

          onImport(items);
          toast({
            title: "Import successful",
            description: `Successfully imported ${items.length} items.`,
          });
          onOpenChange(false);
          setFile(null);
        } catch (error) {
          toast({
            title: "Import failed",
            description: "There was an error processing the CSV file.",
            variant: "destructive",
          });
        } finally {
          setIsProcessing(false);
        }
      },
      error: () => {
        toast({
          title: "Import failed",
          description: "Could not read the CSV file.",
          variant: "destructive",
        });
        setIsProcessing(false);
      },
    });
  };

  const downloadTemplate = () => {
    const template = `nivodaStockId,uniqueSKU,supplierCode,name,description,type,published,naturalVariantPrice,labgrownVariantPrice,metalWeight,bandWidth,numberOfSideStones,totalCttw,ringStyle,ringType,mountStyle,headType,bandShape,settingType,finish,bandStyle,option1Name,option1Value,option2Name,option2Value,naturalColour,naturalClarity,labgrownColour,labgrownClarity,images,thumbnails,video360Url
NIV-001,SKU-001,SUP-001,Classic Solitaire Diamond Ring,Elegant solitaire ring with round brilliant diamond,Ring,true,5999,3499,3.5,2.0,0,1.0,Solitaire;Classic,Engagement,Prong,Cathedral,Round,Four Prong,Polished,Straight,Metal,14KT White Gold,Shape,Round,D,VVS1,E,VVS2,,,`;

    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nivoda-jewelry-template.csv";
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
                />
                <Button variant="secondary" asChild>
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

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleImport}
              disabled={!file || isProcessing}
              className="flex-1"
            >
              {isProcessing ? "Processing..." : "Import"}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Use semicolons (;) to separate multiple values in fields like ringStyle</p>
            <p>• Use "true" or "false" for the published field</p>
            <p>• Numeric fields will be parsed automatically</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
