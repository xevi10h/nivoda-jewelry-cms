import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { JewelryForm } from "@/components/inventory/JewelryForm";
import { CSVImportDialog } from "@/components/inventory/CSVImportDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { JewelryItem } from "@/types/jewelry";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockData: JewelryItem[] = [
  {
    id: "1",
    nivodaStockId: "NIV-001",
    uniqueSKU: "SKU-001",
    supplierCode: "SUP-001",
    name: "Classic Solitaire Diamond Ring",
    description: "Elegant solitaire ring with round brilliant diamond",
    type: "Ring",
    published: true,
    naturalVariantPrice: 5999,
    labgrownVariantPrice: 3499,
    metalWeight: 3.5,
    bandWidth: 2.0,
    numberOfSideStones: 0,
    totalCttw: 1.0,
    ringStyle: ["Solitaire", "Classic"],
    ringType: "Engagement",
    mountStyle: "Prong",
    headType: "Cathedral",
    bandShape: "Round",
    settingType: "Four Prong",
    finish: "Polished",
    bandStyle: "Straight",
    option1Name: "Metal",
    option1Value: "14KT White Gold",
    option2Name: "Shape",
    option2Value: "Round",
    naturalColour: "D",
    naturalClarity: "VVS1",
    labgrownColour: "E",
    labgrownClarity: "VVS2",
    images: [],
    thumbnails: [],
    video360Url: "",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    nivodaStockId: "NIV-002",
    uniqueSKU: "SKU-002",
    supplierCode: "SUP-002",
    name: "Halo Diamond Engagement Ring",
    description: "Stunning halo setting with pavé band",
    type: "Ring",
    published: true,
    naturalVariantPrice: 7499,
    labgrownVariantPrice: 4299,
    metalWeight: 4.2,
    bandWidth: 2.5,
    numberOfSideStones: 32,
    totalCttw: 1.5,
    ringStyle: ["Halo", "Modern"],
    ringType: "Engagement",
    mountStyle: "Halo",
    headType: "Cushion",
    bandShape: "Round",
    settingType: "Pavé",
    finish: "Polished",
    bandStyle: "Pavé",
    option1Name: "Metal",
    option1Value: "18KT Rose Gold",
    option2Name: "Shape",
    option2Value: "Cushion",
    naturalColour: "F",
    naturalClarity: "VS1",
    labgrownColour: "F",
    labgrownClarity: "VS2",
    images: [],
    thumbnails: [],
    video360Url: "",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
];

const Index = () => {
  const [items, setItems] = useState<JewelryItem[]>(mockData);
  const [searchQuery, setSearchQuery] = useState("");
  const [ringStyleFilter, setRingStyleFilter] = useState("all");
  const [ringTypeFilter, setRingTypeFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCSVImportOpen, setIsCSVImportOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<JewelryItem | undefined>();
  const [deleteItem, setDeleteItem] = useState<JewelryItem | undefined>();

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.uniqueSKU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplierCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRingStyle =
      ringStyleFilter === "all" || item.ringStyle.includes(ringStyleFilter);

    const matchesRingType =
      ringTypeFilter === "all" || item.ringType === ringTypeFilter;

    const matchesPublished =
      publishedFilter === "all" ||
      (publishedFilter === "published" && item.published) ||
      (publishedFilter === "draft" && !item.published);

    return matchesSearch && matchesRingStyle && matchesRingType && matchesPublished;
  });

  const handleEdit = (item: JewelryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: JewelryItem) => {
    setDeleteItem(item);
  };

  const confirmDelete = () => {
    if (deleteItem) {
      setItems(items.filter((item) => item.id !== deleteItem.id));
      toast({
        title: "Item deleted",
        description: `${deleteItem.name} has been removed from inventory.`,
      });
      setDeleteItem(undefined);
    }
  };

  const handleSubmit = (data: any) => {
    if (editingItem) {
      setItems(
        items.map((item) =>
          item.id === editingItem.id
            ? { ...item, ...data, updatedAt: new Date().toISOString() }
            : item
        )
      );
      toast({
        title: "Item updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      const newItem: JewelryItem = {
        ...data,
        id: Date.now().toString(),
        ringStyle: [],
        images: [],
        thumbnails: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setItems([...items, newItem]);
      toast({
        title: "Item created",
        description: `${data.name} has been added to inventory.`,
      });
    }
    setIsFormOpen(false);
    setEditingItem(undefined);
  };

  const handleCSVImport = (importedItems: JewelryItem[]) => {
    setItems([...items, ...importedItems]);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Jewelry Inventory</h1>
            <p className="text-muted-foreground mt-1">
              Manage your jewelry collection and variants
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsCSVImportOpen(true)}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
            </Button>
            <Button
              onClick={() => {
                setEditingItem(undefined);
                setIsFormOpen(true);
              }}
              className="bg-primary hover:bg-primary/90 shadow-elegant"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <InventoryFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            ringStyleFilter={ringStyleFilter}
            onRingStyleChange={setRingStyleFilter}
            ringTypeFilter={ringTypeFilter}
            onRingTypeChange={setRingTypeFilter}
            publishedFilter={publishedFilter}
            onPublishedChange={setPublishedFilter}
          />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredItems.length} items</span>
          </div>

          <InventoryTable
            items={filteredItems}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Jewelry Item" : "Add New Jewelry Item"}
            </DialogTitle>
          </DialogHeader>
          <JewelryForm
            item={editingItem}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingItem(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <CSVImportDialog
        open={isCSVImportOpen}
        onOpenChange={setIsCSVImportOpen}
        onImport={handleCSVImport}
      />

      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteItem?.name}" from your inventory. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Index;
