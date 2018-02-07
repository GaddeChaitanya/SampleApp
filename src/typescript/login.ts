
namespace tutorialPoint { 
   export namespace invoiceApp { 
      export class Invoice { 
         public calculateDiscount(price: number) { 
            return price * .40; 
         } 
      } 
   } 
} 

/// <reference path = "Invoice.ts" />
var invoice = new tutorialPoint.invoiceApp.Invoice(); 
console.log(invoice.calculateDiscount(500));