import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface InventoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  ringStyleFilter: string;
  onRingStyleChange: (value: string) => void;
  ringTypeFilter: string;
  onRingTypeChange: (value: string) => void;
  publishedFilter: string;
  onPublishedChange: (value: string) => void;
}

const ringStyles = ["Solitaire", "Halo", "Three-Stone", "Vintage", "Modern", "Classic"];
const ringTypes = ["Engagement", "Wedding Band", "Eternity", "Fashion", "Anniversary"];

export const InventoryFilters = ({
  searchQuery,
  onSearchChange,
  ringStyleFilter,
  onRingStyleChange,
  ringTypeFilter,
  onRingTypeChange,
  publishedFilter,
  onPublishedChange,
}: InventoryFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[250px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, SKU, or code..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={ringStyleFilter} onValueChange={onRingStyleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ring Style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Styles</SelectItem>
          {ringStyles.map((style) => (
            <SelectItem key={style} value={style}>
              {style}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={ringTypeFilter} onValueChange={onRingTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ring Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {ringTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={publishedFilter} onValueChange={onPublishedChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Items</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="draft">Draft</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
