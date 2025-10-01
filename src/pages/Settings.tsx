import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your CMS preferences
          </p>
        </div>

        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <SettingsIcon className="w-6 h-6 text-muted-foreground" />
            </div>
            <CardTitle>Settings Coming Soon</CardTitle>
            <CardDescription>
              Customize your CMS experience with preferences and configurations
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
