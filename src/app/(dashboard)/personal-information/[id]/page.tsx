export default async function PersonalInformation(params: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params.params;
	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold">Personal Information for ID: {resolvedParams.id}</h1>
		</div>
	);
}