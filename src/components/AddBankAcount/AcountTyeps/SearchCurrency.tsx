'use client';
import Select, { SingleValue, StylesConfig } from 'react-select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SelectCustomStyles from '../../SelectCustomStyles/SelectCustomStyles';

type Option = {
    value: string;
    label: string;
};

const options: Option[] = [
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'USD', label: 'USD' },
    { value: 'AED', label: 'AED' },
    { value: 'CAD', label: 'CAD' },
    { value: 'CHF', label: 'CHF' },
    { value: 'EGP', label: 'EGP' },
    { value: 'JPY', label: 'JPY' },
    { value: 'NOK', label: 'NOK' },
    { value: 'TRY', label: 'TRY' },
];



const SearchCurrency = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currency = searchParams.get('currency');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        if (currency) {
            const selected = options.find(option => option.value === currency) || null;
            setSelectedOption(selected);
        }
    }, [currency]);

    const handleChange = (selectedOption: SingleValue<Option>) => {
        setSelectedOption(selectedOption);
        router.push(`?currency=${selectedOption?.value}`);
    };

    return (
        <div className="card mb-5 mb-xl-10">
            <div className="border-0">
                <div className="card-body row p-5 m-0">
                    <div className='col-5'>
                        <label className='form-label'>Currency: </label>
                        <Select 
                            className='bg-body'
                            classNamePrefix='react-select' 
                            options={options} 
                            value={selectedOption}
                            placeholder='Select Currency' 
                            menuPlacement='auto'
                            onChange={handleChange}
                            styles={SelectCustomStyles}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCurrency;
