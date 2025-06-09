"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Trash } from "lucide-react";

export default function PastebinCard() {
  const [text, setText] = useState("");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <Card className="max-w-xl w-full mx-auto mt-8 bg-background text-foreground transition-colors duration-500">
      <CardHeader>
        <CardTitle className="text-lg">Mini Pastebin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          className="h-40 resize-none text-sm"
          placeholder="Paste your code or text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClear}>
            <Trash className="w-4 h-4 mr-1" /> Clear
          </Button>
          <Button onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
