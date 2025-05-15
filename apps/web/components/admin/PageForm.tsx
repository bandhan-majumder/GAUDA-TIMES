"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui"
import { PageForm } from "./AddPageForm";

export default function AdminPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <Tabs defaultValue="add" className="w-[400px] text-white">
            <TabsList className="grid w-full grid-cols-2 border-none outline-none">
                <TabsTrigger value="add">Add</TabsTrigger>
                <TabsTrigger value="update">Update</TabsTrigger>
            </TabsList>
            <TabsContent value="add">
                <Card>
                    <CardHeader>
                        <CardTitle>Add a notion blog</CardTitle>
                        <CardDescription>Add a notion database to your existing collection</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <PageForm mode="add" />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="update">
                <Card>
                    <CardHeader>
                        <CardTitle>Update a notion blog</CardTitle>
                        <CardDescription>Update an existing notion integration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <PageForm mode="edit" />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
        </div>
    )
}
