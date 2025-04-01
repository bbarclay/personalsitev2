declare module '@/components/ui/button' {
  export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
  }>;
}

declare module '@/components/ui/card' {
  export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/slider' {
  export const Slider: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    value?: number[];
    defaultValue?: number[];
    min?: number;
    max?: number;
    step?: number;
    onValueChange?: (value: number[]) => void;
  }>;
}

declare module '@/components/ui/input' {
  export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

declare module '@/components/ui/tabs' {
  export const Tabs: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
  }>;
  export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const TabsTrigger: React.FC<React.HTMLAttributes<HTMLButtonElement> & {
    value: string;
  }>;
  export const TabsContent: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    value: string;
  }>;
}

declare module '@/components/ui/alert' {
  export const Alert: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'destructive';
  }>;
  export const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const AlertDescription: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module '@/components/ui/toggle' {
  export const Toggle: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    variant?: 'default' | 'outline' | 'destructive';
    size?: 'default' | 'sm' | 'lg';
  }>;
}

declare module '@/components/ui/table' {
  export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>>;
  export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  export const TableFooter: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>>;
  export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>>;
  export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>>;
}

declare module '@/components/ui/label' {
  export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>>;
} 