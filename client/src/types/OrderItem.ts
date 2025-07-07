import { OrderItemExtraProps } from './OrderItemExtra';

export type OrderItemProps = {
	name: string;
	price: number;
	extras?: OrderItemExtraProps[];
};
