// snippets.js

export const snippets = {
  html: [
    {
      label: "h1",
      insertText: "<h1>$1</h1>",
      documentation: "h1 heading tag"
    },
    {
      label: "div",
      insertText: "<div>$1</div>",
      documentation: "div block"
    },
    {
      label: "btn",
      insertText: "<button>$1</button>",
      documentation: "button element"
    },
    {
      label: "inp",
      insertText: '<input type="text" placeholder="$1" />',
      documentation: "input field"
    },
    {
      label: "img",
      insertText: '<img src="$1" alt="$2" />',
      documentation: "image element"
    }
  ],

  javascript: [
    {
      label: "fn",
      insertText: "function $1() {\n  $2\n}",
      documentation: "Function declaration"
    },
    {
      label: "cl",
      insertText: "console.log($1);",
      documentation: "console.log statement"
    },
    {
      label: "arr",
      insertText: "const $1 = [$2];",
      documentation: "Array declaration"
    },
    {
      label: "obj",
      insertText: "const $1 = {\n  $2\n};",
      documentation: "Object declaration"
    }
  ],

  python: [
    {
      label: "def",
      insertText: "def $1():\n    $2",
      documentation: "Function definition"
    },
    {
      label: "pr",
      insertText: "print($1)",
      documentation: "print statement"
    },
    {
      label: "if",
      insertText: "if $1:\n    $2",
      documentation: "if statement"
    },
    {
      label: "for",
      insertText: "for $1 in $2:\n    $3",
      documentation: "for loop"
    }
  ],

  cpp: [
    {
      label: "main",
      insertText: "#include <iostream>\nusing namespace std;\n\nint main() {\n  $1\n  return 0;\n}",
      documentation: "C++ main function"
    },
    {
      label: "cout",
      insertText: "cout << $1 << endl;",
      documentation: "Print to console"
    },
    {
      label: "for",
      insertText: "for (int i = 0; i < $1; i++) {\n  $2\n}",
      documentation: "for loop"
    }
  ],

  java: [
    {
      label: "main",
      insertText: "public class Main {\n  public static void main(String[] args) {\n    $1\n  }\n}",
      documentation: "Java main method"
    },
    {
      label: "sout",
      insertText: "System.out.println($1);",
      documentation: "System.out.println"
    },
    {
      label: "for",
      insertText: "for (int i = 0; i < $1; i++) {\n  $2\n}",
      documentation: "for loop"
    }
  ]
};
