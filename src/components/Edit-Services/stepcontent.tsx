import { createContext } from 'react';

interface StepperContextProps {
  stepper: any;
  setCurrentSchema: (schema: any) => void;
}

const StepperContext = createContext<StepperContextProps | null>(null);

export default StepperContext;