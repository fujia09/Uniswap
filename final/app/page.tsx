"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui//animated-beam";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

// Define schema
const formSchema = z.object({
  sellAmount: z
    .number()
    .positive({ message: "Amount must be greater than 0." }),
  sellToken: z.string().min(1, { message: "Select a token to Exchange." }),
});

export default function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellAmount: 0,
      sellToken: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Handle form values
    toast({
      description: `Exchanging ${values.sellAmount} ${values.sellToken} for Uni...`,
    });
  }

  return (
    <div className="flex h-screen w-full items-center justify-between px-10">
      {/* Full-page flex layout */}

      {/* Image and Beams Section (Middle Left) */}
      <div
        ref={containerRef}
        className="relative flex-1 h-full flex items-center justify-center overflow-hidden"
      >
        <div className="flex flex-col items-stretch justify-between gap-10">
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref}>
              <Icons.googleDrive />
            </Circle>
            <Circle ref={div5Ref}>
              <Icons.googleDocs />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref}>
              <Icons.notion />
            </Circle>
            <Circle ref={div4Ref} className="size-16">
              <Icons.openai />
            </Circle>
            <Circle ref={div6Ref}>
              <Icons.zapier />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref}>
              <Icons.whatsapp />
            </Circle>
            <Circle ref={div7Ref}>
              <Icons.messenger />
            </Circle>
          </div>
        </div>

        {/* Animated Beams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          reverse
        />
      </div>

      {/* Form Section (Middle Right) */}
      <div className="flex-1 flex h-full items-center justify-center">
        <div className="w-80">
          {" "}
          {/* Set width for the form */}
          <h1 className="text-2xl font-bold mb-6">Uniswap</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Exchange Amount */}
              <FormField
                control={form.control}
                name="sellAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Exchange Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        } // Cast to number
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Exchange Token Select */}
              <FormField
                control={form.control}
                name="sellToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Exchange Token
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)} // Link to form
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Salmon">Salmon</SelectItem>
                          <SelectItem value="Mackerel">Mackerel</SelectItem>
                          <SelectItem value="Octopus">Octopus</SelectItem>
                          <SelectItem value="Shrimp">Shrimp</SelectItem>
                          <SelectItem value="Squid">Squid</SelectItem>
                          <SelectItem value="Scallop">Scallop</SelectItem>
                          <SelectItem value="Eel">Eel</SelectItem>
                          {/* Add more tokens as needed */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                onClick={() => {
                  toast({
                    description: "The exchange was not committed",
                  });
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md"
              >
                Exchange
                <Toaster />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Icons = {
  notion: () => (
    <img
      src="/images/Screen Shot 2024-10-13 at 00.41.25.png"
      alt="Notion Icon"
      width="170"
      height="170"
    />
  ),
  openai: () => (
    <img
      src="/images/Screen Shot 2024-10-13 at 00.26.27.png"
      alt="Notion Icon"
      width="170"
      height="170"
    />
  ),
  googleDrive: () => (
    <img
      src="/images/Screen Shot 2024-10-13 at 00.36.06.png"
      alt="Notion Icon"
      width="170"
      height="170"
    />
  ),
  whatsapp: () => (
    <img
      src="/images/Screen Shot 2024-10-13 at 00.36.59.png"
      alt="Notion Icon"
      width="170"
      height="170"
    />
  ),
  googleDocs: () => (
    <img
      src="/images/Screen Shot 2024-10-13 at 00.40.13.png"
      alt="Notion Icon"
      width="170"
      height="170"
    />
  ),
  zapier: () => (
    <img
      src="/images/Screen Shot 2024-10-13 at 00.19.31.png"
      alt="Notion Icon"
      width="170"
      height="170"
    />
  ),
  messenger: () => (
    <img
      src="/images/Screen Shot 2024-10-13 at 00.41.42.png"
      alt="Notion Icon"
      width="170"
      height="170"
    />
  ),
};
