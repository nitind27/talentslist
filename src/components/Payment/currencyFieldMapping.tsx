import { CurrencyFieldMapping } from "@/api/payment/types";


export const currencyFieldMapping: CurrencyFieldMapping = {
  EUR: [
  
    { label: "IBAN", key: "IBAN" },
    
  ],
  
  USD: [
   
    { label: "accountNumber", key: "accountNumber"},
  ],
  AED: [
    { label: "IBAN", key: "IBAN" },
   
  ],
  CAD: [
    { label: "accountNumber", key: "accountNumber"},
  ],
  CHF: [
   
    { label: "IBAN", key: "IBAN" },
  ],
  EGP: [
    
    { label: "IBAN", key: "IBAN" },
  ],
  JPY: [ 
    { label: "accountNumber", key: "accountNumber" },
  ],
  NOK: [
    { label: "IBAN", key: "IBAN" },
  ],
  TRY: [
    
    { label: "IBAN", key: "IBAN" },
  ],
  GBP: [
    { label: "accountNumber", key: "accountNumber" },
    // { label: "IBAN", key: "IBAN" },
  ],
};