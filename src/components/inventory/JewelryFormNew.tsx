import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  JewelleryTypeEnum,
  JewelleryMetalTypeEnum,
  JewelleryMetalKaratEnum,
  JewellerySettingEnum,
  CatalogSourceEnum,
  JewelleryStonePosition,
} from "@/graphql/enums";
import { Jewellery } from "@/graphql/types";
import { CreateJewelleryInput, UpdateJewelleryInput } from "@/graphql/inputs";
import { useCreateJewellery, useUpdateJewellery } from "@/hooks/use-jewellery";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  // Basic Jewellery fields
  sku: z.string().optional(),
  nivodaStockId: z.string().optional(),
  catalogSource: z.nativeEnum(CatalogSourceEnum).optional(),
  description: z.string().optional(),
  comments: z.string().optional(),
  type: z.nativeEnum(JewelleryTypeEnum),
  status: z.string().default("In Stock"),

  // Ring specific fields
  ringType: z.string().optional(),
  ringCategory: z.string().optional(),
  setting: z.nativeEnum(JewellerySettingEnum).default(JewellerySettingEnum.FINISHED),
  sizeType: z.string().default("US_CA"),

  // Metal properties
  metalType: z.nativeEnum(JewelleryMetalTypeEnum),
  metalKarat: z.nativeEnum(JewelleryMetalKaratEnum),
  metalWeight: z.number().positive("Must be positive"),

  // Pricing
  naturalVariantPrice: z.number().optional(),
  labgrownVariantPrice: z.number().optional(),

  // Ring dimensions
  ringWidth: z.number().optional(),
  bandWidth: z.number().optional(),

  // Stone information
  hasAccentStones: z.boolean().optional(),
  hasSideStones: z.boolean().optional(),
  hasMelee: z.boolean().optional(),
  numberOfSideStones: z.number().optional(),
  totalCttw: z.number().optional(),

  // Stone details for side stones
  stoneCarat: z.number().optional(),
  stoneColor: z.string().optional(),
  stoneClarity: z.string().optional(),
  stoneShape: z.string().optional(),
  isLabgrown: z.boolean().optional(),

  // Video
  video360Url: z.string().url().optional().or(z.literal("")),
});

interface JewelryFormNewProps {
  item?: Jewellery;
  onSubmit: () => void;
  onCancel: () => void;
}

export const JewelryFormNew = ({ item, onSubmit, onCancel }: JewelryFormNewProps) => {
  const { createJewellery, loading: creating } = useCreateJewellery();
  const { updateJewellery, loading: updating } = useUpdateJewellery();

  const loading = creating || updating;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: item ? {
      sku: item.sku || "",
      nivodaStockId: item.nivodaStockId || "",
      catalogSource: item.catalogSource || CatalogSourceEnum.NIVODA,
      description: item.description || "",
      comments: item.comments || "",
      type: item.type,
      status: item.status || "In Stock",
      ringType: item.ring?.ringType || "",
      ringCategory: item.ring?.category || "",
      setting: item.ring?.setting || JewellerySettingEnum.FINISHED,
      sizeType: item.ring?.sizeType || "US_CA",
      metalType: item.mounts?.[0]?.metalType || JewelleryMetalTypeEnum.WHITE_GOLD,
      metalKarat: item.mounts?.[0]?.metalKarat || JewelleryMetalKaratEnum.KT_14KT,
      metalWeight: item.mounts?.[0]?.metalWeight || 0,
      naturalVariantPrice: item.ring?.naturalVariantPrice ? item.ring.naturalVariantPrice / 100 : undefined,
      labgrownVariantPrice: item.ring?.labgrownVariantPrice ? item.ring.labgrownVariantPrice / 100 : undefined,
      ringWidth: item.ring?.ringWidth || undefined,
      hasAccentStones: item.hasAccentStones || false,
      hasSideStones: item.hasSideStones || false,
      hasMelee: item.hasMelee || false,
      numberOfSideStones: item.stones?.filter(s => s.stonePosition === "SIDE").reduce((sum, s) => sum + (s.pieces || 0), 0) || undefined,
      totalCttw: item.stones?.reduce((sum, s) => sum + (s.carats || 0), 0) || undefined,
      stoneCarat: item.stones?.[0]?.carats || undefined,
      stoneColor: item.stones?.[0]?.color || "",
      stoneClarity: item.stones?.[0]?.clarity || "",
      stoneShape: item.stones?.[0]?.shape || "",
      isLabgrown: item.stones?.[0]?.isLabgrown || false,
      video360Url: item.ring?.video || "",
    } : {
      sku: "",
      nivodaStockId: "",
      catalogSource: CatalogSourceEnum.NIVODA,
      description: "",
      comments: "",
      type: JewelleryTypeEnum.RING,
      status: "In Stock",
      setting: JewellerySettingEnum.FINISHED,
      sizeType: "US_CA",
      metalType: JewelleryMetalTypeEnum.WHITE_GOLD,
      metalKarat: JewelleryMetalKaratEnum.KT_14KT,
      metalWeight: 0,
      hasAccentStones: false,
      hasSideStones: false,
      hasMelee: false,
      isLabgrown: false,
      video360Url: "",
    },
  });

  const handleSubmit = async (data: any) => {
    try {
      if (item?.id) {
        // Update existing jewellery
        const updateInput: UpdateJewelleryInput = {
          jewellery: {
            id: item.id,
            sku: data.sku,
            nivodaStockId: data.nivodaStockId,
            catalogSource: data.catalogSource,
            description: data.description,
            comments: data.comments,
            type: data.type,
            status: data.status,
          },
          engagement_ring: data.type === JewelleryTypeEnum.RING ? {
            id: item.ring?.id,
            setting: data.setting,
            sizeType: data.sizeType,
            metalKarat: data.metalKarat,
            metalType: data.metalType,
          } : undefined,
          mounts: [{
            id: item.mounts?.[0]?.id,
            metalType: data.metalType,
            metalKarat: data.metalKarat,
            metalWeight: data.metalWeight,
          }],
          stones: data.numberOfSideStones && data.stoneCarat ? [{
            id: item.stones?.[0]?.id,
            productType: "MELEE",
            stonePosition: JewelleryStonePosition.SIDE,
            pieces: data.numberOfSideStones,
            carats: data.totalCttw,
            color: data.stoneColor,
            clarity: data.stoneClarity,
            shape: data.stoneShape,
            isLabgrown: data.isLabgrown,
          }] : undefined,
        };

        await updateJewellery(updateInput);
      } else {
        // Create new jewellery
        const createInput: CreateJewelleryInput = {
          jewellery: {
            sku: data.sku,
            nivodaStockId: data.nivodaStockId,
            catalogSource: data.catalogSource,
            description: data.description,
            comments: data.comments,
            type: data.type,
            status: data.status,
          },
          engagement_ring: data.type === JewelleryTypeEnum.RING ? {
            setting: data.setting,
            sizeType: data.sizeType,
            metalKarat: data.metalKarat,
            metalType: data.metalType,
          } : undefined,
          mounts: [{
            metalType: data.metalType,
            metalKarat: data.metalKarat,
            metalWeight: data.metalWeight,
          }],
          stones: data.numberOfSideStones && data.stoneCarat ? [{
            productType: "MELEE",
            stonePosition: JewelleryStonePosition.SIDE,
            pieces: data.numberOfSideStones,
            carats: data.totalCttw,
            color: data.stoneColor,
            clarity: data.stoneClarity,
            shape: data.stoneShape,
            isLabgrown: data.isLabgrown,
          }] : undefined,
          catalogSource: data.catalogSource,
        };

        await createJewellery(createInput);
      }

      onSubmit();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="metal">Metal & Pricing</TabsTrigger>
            <TabsTrigger value="stones">Stones</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nivodaStockId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivoda Stock ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="NIV-001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="SKU-001" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jewellery Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(JewelleryTypeEnum).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace(/_/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="catalogSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catalog Source</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(CatalogSourceEnum).map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} placeholder="Product description..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} placeholder="Internal comments..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="setting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setting Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select setting" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(JewellerySettingEnum).map((setting) => (
                          <SelectItem key={setting} value={setting}>
                            {setting.replace(/_/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="In Stock" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="metal" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="metalType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metal Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select metal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(JewelleryMetalTypeEnum).map((metal) => (
                          <SelectItem key={metal} value={metal}>
                            {metal.replace(/_/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metalKarat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metal Karat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select karat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(JewelleryMetalKaratEnum).map((karat) => (
                          <SelectItem key={karat} value={karat}>
                            {karat.replace('KT_', '')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metalWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metal Weight (g)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="naturalVariantPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Natural Diamond Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labgrownVariantPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lab-Grown Diamond Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ringWidth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ring Width (mm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="stones" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="numberOfSideStones"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Side Stones</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalCttw"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Carat Weight</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stoneShape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stone Shape</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Round, Cushion" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stoneColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stone Color</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., D, E, F" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stoneClarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stone Clarity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., IF, VVS1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="video360Url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>360° Video URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {item ? "Update Item" : "Create Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
