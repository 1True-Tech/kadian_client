import cookies from "@/lib/utils/cookies";

export async function getImages(): Promise<any> {
  const token = cookies.get("access_token") || "";
  const res = await fetch("/api/images", {
    headers: { authorization: "Bearer " + token },
  });
  return res.json();
}

export async function getImageById({ params: { id } }: { params: { id: string } }): Promise<any> {
  const token = cookies.get("access_token") || "";
  const res = await fetch(`/api/images/${id}`, {
    headers: { authorization: "Bearer " + token },
  });
  return res;
}