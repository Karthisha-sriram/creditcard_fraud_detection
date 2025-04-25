
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface UploadDatasetCardProps {
  onDatasetUploaded?: (file: File) => void;
}

const UploadDatasetCard: React.FC<UploadDatasetCardProps> = ({ onDatasetUploaded }) => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const uploadedFile = e.dataTransfer.files[0];
      handleFile(uploadedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (uploadedFile: File) => {
    // Check if it's a CSV file
    if (!uploadedFile.name.endsWith('.csv')) {
      toast({
        title: "Invalid file format",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }
    
    setFile(uploadedFile);
    
    if (onDatasetUploaded) {
      onDatasetUploaded(uploadedFile);
    }
    
    toast({
      title: "File uploaded successfully",
      description: `File "${uploadedFile.name}" is ready to be processed.`,
    });
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Dataset</CardTitle>
        <CardDescription>
          Upload your transaction dataset to train the fraud detection model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
            dragging ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />
          
          {file ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Check className="h-6 w-6" />
              </div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <Button
                variant="outline"
                onClick={triggerFileInput}
                className="mt-2"
              >
                Replace File
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Drag and drop your CSV file here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The file should contain transaction data with features for fraud detection
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={triggerFileInput}
                >
                  Select File
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
        <span>Supported format: CSV</span>
        <span>Max file size: 10MB</span>
      </CardFooter>
    </Card>
  );
};

export default UploadDatasetCard;
