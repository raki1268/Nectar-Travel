// ============================================
// 4. globalConfig.js - 全局配置（不变内容）
// ============================================
export const globalConfig = {
  bookingPolicy: {
    cancellation: [
      { days: "More than 60 days before departure", refund: "100% refund" },
      { days: "30-60 days before departure", refund: "75% refund" },
      { days: "15-30 days before departure", refund: "50% refund" },
      { days: "Less than 15 days", refund: "No refund" }
    ],
    payment: [
      { method: "Credit Card", description: "Visa, MasterCard, American Express accepted" },
      { method: "Bank Transfer", description: "Direct bank transfer available for orders over $5000" },
      { method: "Payment Plan", description: "Flexible 3-month payment plan with 5% surcharge" }
    ]
  },
  teamInfo: {
    image: "images/categories/team.jpg",
    description: "Our professional team is dedicated to providing exceptional travel experiences. We carefully curate each detail to ensure your journey is seamless and memorable. From expert local guides to luxury accommodations, we handle everything so you can focus on enjoying the remarkable landscapes and vibrant cultures. Our commitment to excellence ensures every moment of your trip exceeds expectations."
  }
};