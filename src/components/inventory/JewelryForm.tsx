import { JewelryItem } from "@/types/jewelry";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  nivodaStockId: z.string().min(1, "Required"),
  uniqueSKU: z.string().min(1, "Required"),
  supplierCode: z.string().min(1, "Required"),
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  type: z.string().min(1, "Type is required"),
  published: z.boolean(),
  naturalVariantPrice: z.number().positive("Must be positive"),
  labgrownVariantPrice: z.number().positive("Must be positive"),
  metalWeight: z.number().positive("Must be positive"),
  bandWidth: z.number().positive("Must be positive"),
  numberOfSideStones: z.number().min(0),
  totalCttw: z.number().positive("Must be positive"),
  ringType: z.string(),
  mountStyle: z.string(),
  headType: z.string(),
  bandShape: z.string(),
  settingType: z.string(),
  finish: z.string(),
  bandStyle: z.string(),
  option1Name: z.string(),
  option1Value: z.string(),
  option2Name: z.string(),
  option2Value: z.string(),
  naturalColour: z.string(),
  naturalClarity: z.string(),
  labgrownColour: z.string(),
  labgrownClarity: z.string(),
  video360Url: z.string().url().optional().or(z.literal("")),
});

interface JewelryFormProps {
  item?: JewelryItem;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const JewelryForm = ({ item, onSubmit, onCancel }: JewelryFormProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: item || {
      nivodaStockId: "",
      uniqueSKU: "",
      supplierCode: "",
      name: "",
      description: "",
      type: "",
      published: false,
      naturalVariantPrice: 0,
      labgrownVariantPrice: 0,
      metalWeight: 0,
      bandWidth: 0,
      numberOfSideStones: 0,
      totalCttw: 0,
      ringType: "",
      mountStyle: "",
      headType: "",
      bandShape: "",
      settingType: "",
      finish: "",
      bandStyle: "",
      option1Name: "Metal",
      option1Value: "",
      option2Name: "Shape",
      option2Value: "",
      naturalColour: "",
      naturalClarity: "",
      labgrownColour: "",
      labgrownClarity: "",
      video360Url: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="nivodaStockId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivoda Stock ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uniqueSKU"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unique SKU</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supplierCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., Classic Solitaire Diamond Ring" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} placeholder="Product description..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Ring" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel>Published</FormLabel>
                      <p className="text-sm text-muted-foreground">Make this item visible</p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="specs" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
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
              <FormField
                control={form.control}
                name="bandWidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Band Width (mm)</FormLabel>
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
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="naturalColour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Natural Stone Colour</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., D, E, F" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="naturalClarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Natural Stone Clarity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., IF, VVS1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labgrownColour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lab-Grown Colour</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., D, E, F" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labgrownClarity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lab-Grown Clarity</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., IF, VVS1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 mt-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="option1Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option 1 Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="option1Value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option 1 Value</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., 9KT Yellow Gold" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="option2Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option 2 Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="option2Value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Option 2 Value</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Round" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ringType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ring Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Engagement" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mountStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mount Style</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bandShape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Band Shape</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="settingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setting Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="finish"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finish</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., Polished" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bandStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Band Style</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            {item ? "Update Item" : "Create Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
