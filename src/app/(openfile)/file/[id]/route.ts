import { config } from "@/config/config";

type FileDetailResponse = {
	std_file_originalname?: string;
	std_file_mimetype?: string;
	url?: string;
};

type RouteContext = {
	params: { id: string } | Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
	const { id } = await context.params;

	if (!id) {
		return new Response("Missing file id", { status: 400 });
	}

	if (!config.backend.baseUrl) {
		return new Response("Backend URL is not configured", { status: 500 });
	}

	const backendHeaders = new Headers();
	const cookie = request.headers.get("cookie");
	const authorization = request.headers.get("authorization");

	if (cookie) {
		backendHeaders.set("cookie", cookie);
	}

	if (authorization) {
		backendHeaders.set("authorization", authorization);
	}

	const detailResponse = await fetch(`${config.backend.baseUrl}/api/staff/file/${id}`, {
		headers: backendHeaders,
		cache: "no-store",
	});

	if (!detailResponse.ok) {
		return new Response("Unable to fetch file metadata", { status: detailResponse.status });
	}

	const fileDetail = (await detailResponse.json()) as FileDetailResponse;

	if (!fileDetail.url) {
		return new Response("File URL not found", { status: 404 });
	}

	const fileResponse = await fetch(fileDetail.url, { cache: "no-store" });

	if (!fileResponse.ok) {
		return new Response("Unable to fetch file content", { status: fileResponse.status });
	}

	const fileBuffer = await fileResponse.arrayBuffer();
	const originalName = fileDetail.std_file_originalname ? decodeURIComponent(fileDetail.std_file_originalname) : `${id}`;
	const quotedFileName = originalName.replaceAll('"', "");
	const contentType = fileDetail.std_file_mimetype || fileResponse.headers.get("content-type") || "application/octet-stream";

	const responseHeaders = new Headers();
	responseHeaders.set("content-type", contentType);
	responseHeaders.set("content-disposition", `inline; filename="${quotedFileName}"; filename*=UTF-8''${encodeURIComponent(originalName)}`);
	responseHeaders.set("content-length", String(fileBuffer.byteLength));

	return new Response(fileBuffer, {
		status: 200,
		headers: responseHeaders,
	});
}
