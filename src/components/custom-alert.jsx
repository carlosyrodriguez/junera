import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert";

import { Terminal } from "lucide-react";
export function CustomAlert({ Icon = "Terminal", title, description, borderColor = "", backgroundColor = "" }) {
    return (
      <Alert className={`border ${borderColor} ${backgroundColor} p-4 rounded-md flex items-start`}>
        <Icon className="h-4 w-4 mr-2" />
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </div>
      </Alert>
    );
  }