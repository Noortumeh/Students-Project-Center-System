import { useQuery } from "@tanstack/react-query";
import { fetchWorkgroupData } from "../../../../../util/httpsForUser/https";

export function useWorkgroup(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["workgroup", id],
    queryFn: () => fetchWorkgroupData(id),
    enabled: !!id,
  });
  return { data, isLoading, error };
}
