export function formattedDate(d: any) {
	d = typeof d === 'string' ? new Date(d) : d;

	let month = String(d.getMonth() + 1);
	let day = String(d.getDate());
	let hours = String(d.getHours());
	let minutes = String(d.getMinutes());
	const year = String(d.getFullYear());

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	if (hours.length < 2) hours = '0' + hours;
	if (minutes.length < 2) minutes = '0' + minutes;

	return `${day}/${month}/${year} ${hours}:${minutes}`;
}
