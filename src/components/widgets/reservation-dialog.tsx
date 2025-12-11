"use client";

import {
  AlertCircle,
  Car,
  Check,
  CreditCard,
  Loader2,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import type { Event } from "@/types/events";

type ReservationDialogProps = {
  event: Event;
  trigger?: React.ReactNode;
  onReserve?: (pickupAddress?: string) => void;
};

type Step = "details" | "payment" | "confirmation";

export const ReservationDialog = ({
  event,
  trigger,
  onReserve,
}: ReservationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("details");
  const [wantPickup, setWantPickup] = useState(false);
  const [pickupAddress, setPickupAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReserve = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStep("confirmation");
    setIsProcessing(false);
    onReserve?.(wantPickup ? pickupAddress : undefined);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset after animation
    setTimeout(() => {
      setStep("details");
      setWantPickup(false);
      setPickupAddress("");
    }, 300);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2" size="lg">
            Reserve Your Spot
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        {step === "details" && (
          <>
            <DialogHeader>
              <DialogTitle>Reserve Your Spot</DialogTitle>
              <DialogDescription>
                {event.title} · {event.time}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
              {/* Event Summary */}
              <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Venue</span>
                  <span className="font-medium text-sm">{event.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">
                    Prepayment
                  </span>
                  <span className="font-bold text-lg">{event.prepayment}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Credit</span>
                  <span className="font-medium text-sm">{event.credit}</span>
                </div>
                {event.isDiscountApplied === true ? (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Discount
                    </span>
                    <span className="font-medium text-green-600 text-sm">
                      {event.discountAmount} off!
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Pickup Option */}
              {event.pickupAvailable === true ? (
                <div className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Car className="size-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium" htmlFor="pickup">
                          Want a free pickup?
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          Get picked up from home or work
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={wantPickup}
                      id="pickup"
                      onCheckedChange={setWantPickup}
                    />
                  </div>

                  {wantPickup === true ? (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="pickup-address">Pickup Address</Label>
                      <div className="relative">
                        <MapPin className="absolute top-3 left-3 size-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          id="pickup-address"
                          onChange={(e) => setPickupAddress(e.target.value)}
                          placeholder="Enter your address in Tallinn"
                          value={pickupAddress}
                        />
                      </div>
                      <p className="text-muted-foreground text-xs">
                        The founder will pick you up 15-30 minutes before the
                        meetup
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* No Refund Notice */}
              <Alert>
                <AlertCircle className="size-4" />
                <AlertDescription className="text-xs">
                  As the best venues we work with need to know how many
                  attendees, we cannot do refunds. But we make it very easy to
                  donate your spot to keep your streak going!
                </AlertDescription>
              </Alert>
            </div>

            <DialogFooter>
              <Button
                className="w-full gap-2"
                onClick={() => setStep("payment")}
              >
                Continue to Payment
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "payment" && (
          <>
            <DialogHeader>
              <DialogTitle>Payment</DialogTitle>
              <DialogDescription>
                Prepay {event.prepayment} for {event.credit} credit
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-6 py-4">
              {/* Mock Payment Form */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute top-3 left-3 size-4 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch defaultChecked id="save-card" />
                  <Label className="text-sm" htmlFor="save-card">
                    Save card for future reservations
                  </Label>
                </div>
              </div>

              <Separator />

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-xl">{event.prepayment}</span>
              </div>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                className="w-full gap-2"
                disabled={isProcessing}
                onClick={handleReserve}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay {event.prepayment}</>
                )}
              </Button>
              <Button
                className="w-full"
                disabled={isProcessing}
                onClick={() => setStep("details")}
                variant="ghost"
              >
                Back
              </Button>
            </DialogFooter>
          </>
        )}

        {step === "confirmation" && (
          <>
            <DialogHeader className="flex flex-col items-center gap-4 text-center">
              <div className="grid size-16 place-items-center rounded-full bg-green-100">
                <Check className="size-8 text-green-600" />
              </div>
              <div className="flex flex-col gap-2">
                <DialogTitle>Spot Reserved!</DialogTitle>
                <DialogDescription>
                  You're all set for {event.title}
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2 rounded-lg bg-muted/50 p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-medium">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">When</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Where</span>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Credit</span>
                  <span className="font-medium">{event.credit}</span>
                </div>
                {event.doorCode ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Door Code</span>
                    <span className="font-bold font-mono">
                      {event.doorCode}
                    </span>
                  </div>
                ) : null}
                {wantPickup === true && pickupAddress ? (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pickup</span>
                    <span className="font-medium">{pickupAddress}</span>
                  </div>
                ) : null}
              </div>

              <p className="text-center text-muted-foreground text-xs">
                A confirmation email has been sent to your inbox
              </p>
            </div>

            <DialogFooter>
              <Button className="w-full" onClick={handleClose}>
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
