import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useUIStore } from "@/store/uiStore";
import EnquiryForm from "./EnquiryForm";

export default function EnquiryModal() {
  const { enquiryOpen, enquiryProductId, enquiryProductTitle, closeEnquiry } =
    useUIStore();

  return (
    <Dialog open={enquiryOpen} onOpenChange={(v) => !v && closeEnquiry()}>
      <DialogContent className="max-w-lg p-8 md:p-10 border-hairline rounded-none">
        <div className="mb-6">
          <p className="eyebrow-gold">Private enquiry</p>
          <h2 className="font-display text-3xl md:text-4xl mt-2">
            Speak to the atelier
          </h2>
        </div>
        <EnquiryForm
          productId={enquiryProductId}
          productTitle={enquiryProductTitle}
          compact
        />
      </DialogContent>
    </Dialog>
  );
}
