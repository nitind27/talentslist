// components/DatePicker.tsx
import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import 'rsuite/dist/rsuite-no-reset.min.css';

import { Container, Row, Col } from 'react-bootstrap';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { format, parse } from 'date-fns';

type DateRange = [Date, Date];

type RangeType<T = DateRange> = {
  label: string;
  value: T | ((value?: T) => T);
  placement?: 'left' | 'bottom';
  closeOverlay?: boolean;
  appearance?: 'default' | 'subtle' | 'link' | 'ghost' | 'primary';
};

const predefinedRanges: RangeType<DateRange>[] = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement: 'left'
  },
  {
    label: 'Yesterday',
    value: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
    placement: 'left'
  },
  {
    label: 'This week',
    value: [new Date(Date.now() - (new Date().getDay() * 86400000)), new Date()],
    placement: 'left'
  },
  {
    label: 'Last 7 days',
    value: [new Date(Date.now() - 604800000), new Date()],
    placement: 'left'
  },
  {
    label: 'Last 30 days',
    value: [new Date(Date.now() - 2592000000), new Date()],
    placement: 'left'
  },
  {
    label: 'This month',
    value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Last month',
    value: [new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), new Date(new Date().getFullYear(), new Date().getMonth(), 0)],
    placement: 'left'
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Last year',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
    placement: 'left'
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Last week',
    closeOverlay: false,
    value: (value: DateRange = [new Date(), new Date()]): DateRange => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
      ];
    },
    appearance: 'default'
  },
  {
    label: 'Next week',
    closeOverlay: false,
    value: (value: DateRange = [new Date(), new Date()]): DateRange => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
      ];
    },
    appearance: 'default'
  }
];

const DatePicker: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | null>(null);

  useEffect(() => {
    const dateRange = searchParams.get('date');
    if (dateRange) {
      const [start, end] = dateRange.split(' - ').map(date => parse(date, 'yyyy/MM/dd', new Date()));
      setSelectedDateRange([start, end]);
    }
  }, [searchParams]);

  const handleDateRangeChange = (range: DateRange | null, event: React.SyntheticEvent<Element, Event>) => {
    setSelectedDateRange(range);
    const params = new URLSearchParams(searchParams.toString());
    if (range) {
      const formattedStart = format(range[0], 'yyyy/MM/dd');
      const formattedEnd = format(range[1], 'yyyy/MM/dd');
      params.set('date', `${formattedStart} - ${formattedEnd}`);
    } else {
      params.delete('date');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col md={12}>
        <DateRangePicker
            ranges={predefinedRanges}
            placeholder="Select Date"
            placement="autoVerticalEnd"
            value={selectedDateRange}
            onChange={handleDateRangeChange}
            className="custom-date-range-picker" 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DatePicker;
