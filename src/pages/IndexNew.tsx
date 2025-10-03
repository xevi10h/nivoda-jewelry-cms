import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Loader2 } from "lucide-react";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { JewelryFormNew } from "@/components/inventory/JewelryFormNew";
import { CSVImportDialogNew } from "@/components/inventory/CSVImportDialogNew";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useGetFilteredRings, useDeleteJewellery } from "@/hooks/use-jewellery";
import { Jewellery } from "@/graphql/types";
import { toast } from "@/hooks/use-toast";
import { SortFieldsEnum, OrderDirection } from "@/graphql/enums";

const IndexNew = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ringStyleFilter, setRingStyleFilter] = useState("all");
  const [ringTypeFilter, setRingTypeFilter] = useState("all");
  const [publishedFilter, setPublishedFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCSVImportOpen, setIsCSVImportOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Jewellery | undefined>();
  const [deleteItem, setDeleteItem] = useState<Jewellery | undefined>();
  const [page, setPage] = useState(0);
  const pageSize = 50;

  // Build filters for GraphQL query
  const filters: any = {};
  if (ringStyleFilter !== "all") {
    filters.styleTags = [ringStyleFilter];
  }
  // Add more filters as needed

  // Fetch data from GraphQL API
  const { data, loading, error, refetch } = useGetFilteredRings(
    filters,
    undefined,
    { field: SortFieldsEnum.PRICE, direction: OrderDirection.ASC },
    pageSize,
    page * pageSize
  );

  const { deleteJewellery, loading: deleting } = useDeleteJewellery();

  const items = data?.getFilteredRings?.items || [];
  const totalCount = data?.getFilteredRings?.totalCount || 0;

  // Client-side filtering for search
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      (item.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.sku?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.nivodaStockId?.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSearch;
  });

  const handleEdit = (item: Jewellery) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: Jewellery) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      try {
        await deleteJewellery(deleteItem.id);
        setDeleteItem(undefined);
        refetch();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setEditingItem(undefined);
    refetch();
  };

  const handleCSVImport = async () => {
    refetch();
  };

  // Convert Jewellery to JewelryItem format for the table
  const tableItems = filteredItems.map((item) => ({
    id: item.id,
    nivodaStockId: item.nivodaStockId || "",
    uniqueSKU: item.sku || "",
    supplierCode: item.supplierStockId || "",
    name: item.description || "",
    description: item.comments || "",
    type: item.type,
    published: item.status === "In Stock",
    naturalVariantPrice: item.ring?.naturalVariantPrice ? item.ring.naturalVariantPrice / 100 : 0,
    labgrownVariantPrice: item.ring?.labgrownVariantPrice ? item.ring.labgrownVariantPrice / 100 : 0,
    metalWeight: item.mounts?.[0]?.metalWeight || 0,
    bandWidth: item.ring?.ringWidth || 0,
    numberOfSideStones: item.stones?.filter(s => s.stonePosition === "SIDE").reduce((sum, s) => sum + (s.pieces || 0), 0) || 0,
    totalCttw: item.stones?.reduce((sum, s) => sum + (s.carats || 0), 0) || 0,
    ringStyle: item.ring?.styles?.map(s => s.name) || [],
    ringType: item.ring?.ringType || "",
    mountStyle: item.mountStyle?.value || "",
    headType: "",
    bandShape: "",
    settingType: item.settingType?.value || "",
    finish: "",
    bandStyle: item.bandStyle?.value || "",
    option1Name: "Metal",
    option1Value: item.mounts?.[0]?.metalType ? `${item.mounts[0].metalKarat?.replace('KT_', '')} ${item.mounts[0].metalType?.replace(/_/g, ' ')}` : "",
    option2Name: "Shape",
    option2Value: item.ring?.stoneShape?.value || "",
    naturalColour: item.stones?.[0]?.color || "",
    naturalClarity: item.stones?.[0]?.clarity || "",
    labgrownColour: "",
    labgrownClarity: "",
    images: [],
    thumbnails: [],
    video360Url: item.ring?.video || "",
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

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

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
              Error loading jewelry items: {error.message}
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing {filteredItems.length} of {totalCount} items</span>
              </div>

              <InventoryTable
                items={tableItems}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />

              {totalCount > pageSize && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page + 1} of {Math.ceil(totalCount / pageSize)}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPage(p => p + 1)}
                    disabled={(page + 1) * pageSize >= totalCount}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Jewelry Item" : "Add New Jewelry Item"}
            </DialogTitle>
          </DialogHeader>
          <JewelryFormNew
            item={editingItem}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingItem(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      <CSVImportDialogNew
        open={isCSVImportOpen}
        onOpenChange={setIsCSVImportOpen}
        onImport={handleCSVImport}
      />

      <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(undefined)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deleteItem?.description}" from your inventory. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default IndexNew;
