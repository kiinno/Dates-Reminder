import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import systemContext from "../context";

const DatesAction = () => {
  const systemData = useContext(systemContext);

  const fetchDates = async () => {
    const response = await fetch(
      "http://127.0.0.1:3100/api/dates-reminder?limit=10000",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  };

  const cleanDates = async () => {
    const response = await fetch(
      "http://127.0.0.1:3100/api/dates-reminder/stone",
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  };

  const cleanDatesHandler = () => {
    cleanDates()
      .then(() => {
        fetchDates()
          .then((response) => {
            systemData.setDates(response?.data ?? []);
            toast.success("تم تنظيف جميع المواعيد");
          })
          .catch((err) => {
            toast.error("فشل في تنظيف المواعيد");
          });
      })
      .catch((err) => {
        toast.error("فشل في تنظيف المواعيد");
      });
  };

  const generateDatesHandler = (ev) => {
    const generateAsync = async () => {
      const response = await fetch(
        `http://127.0.0.1:3100/api/dates-reminder/stone?length=100`,
        { method: "POST" }
      );
      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.message);
      }
      return data;
    };

    generateAsync()
      .then(() => {
        fetchDates()
          .then((response) => {
            systemData.setDates(response?.data ?? []);
            toast.success("تم انشاء مواعيد وهميه بنجاح");
          })
          .catch((err) => {
            toast.error("فشل في انشاء المواعيد الوهميه");
          });
      })
      .catch((err) => {
        toast.error("فشل في انشاء المواعيد الوهميه");
      });
  };
  return (
    <div className="d-flex gap-2">
      <Button variant="danger" onClick={cleanDatesHandler}>
        حذف الجميع
      </Button>
      <Button variant="secondary" onClick={generateDatesHandler}>
        انشاء بعض المواعيد
      </Button>
    </div>
  );
};

export default DatesAction;
