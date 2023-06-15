import { useCallback, useContext, useEffect } from "react";
import systemContext from "../context";
import { toast } from "react-toastify";

const useDatesAPI = () => {
  const contextData = useContext(systemContext);

  const fetchDates = useCallback(async () => {
    const response = await fetch(
      "http://127.0.0.1:3100/api/dates-reminder?limit=10000",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  }, []);

  useEffect(() => {
    fetchDates()
      .then((API_DATA) => {
        contextData.setDates(API_DATA?.data ?? []);
        toast("مرحبا بك, هذه هي المواعيد المتاحه");
      })
      .catch((error) =>
        toast.error("فشل في الحصول علي المواعيد الرجاء التحقق من  الاتصال")
      );
  }, []);

  return contextData.system.dates;
};

export default useDatesAPI;
