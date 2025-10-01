import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gem } from "lucide-react";

const Collections = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Collections</h1>
          <p className="text-muted-foreground mt-1">
            Organize your jewelry into collections
          </p>
        </div>

        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Gem className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle>Collections Coming Soon</CardTitle>
            <CardDescription>
              Group your jewelry items into themed collections for better organization
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  );
};

export default Collections;
