import { OrderItemProps } from '../types/OrderItem';

export default function OrderItem({ name, price, extras }: OrderItemProps) {
	return (
		<li className="flex flex-row justify-between gap-2">
			<div>
				<h3>{name}</h3>
				{extras &&
					extras.map((extra) => (
						<p className="text-sm text-gray-500" key={extra.name}>
							{extra.name} • £{extra.price}
						</p>
					))}
			</div>
			<h4>£{price}</h4>
		</li>
	);
}
