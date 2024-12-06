import Mathpix from "@/components/mathpix";
import React from "react";

export default function Page() {
  return (
    <Mathpix
      latexText={`### Welcome to SandBugger.io!  
**Your Ultimate Debugging Sandbox**  

🚀 **Get Started:**  
- Click **Create Session** to begin a new debugging session.  
- Use our powerful tools to write, debug, and test code in a secure environment.

💡 **Tips:**  
- Sessions are isolated for safe experimentation.  
- You can save and revisit your sessions anytime!  

🎯 **Ready to Debug Smarter?** Let’s get started!`}
    />
  );
}
