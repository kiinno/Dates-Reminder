import React, { useContext } from "react";
import useDatesAPI from "../hooks/useDatesAPI";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import systemContext from "../context";

const Dates = ({ data }) => {
  const dates = useDatesAPI();
  const systemData = useContext(systemContext);

  const deleteDateHandler = (id) => {
    return (ev) => {
      const deleteAsync = async () => {
        const response = await fetch(
          `http://127.0.0.1:3100/api/dates-reminder/id/${id}`,
          { method: "DELETE" }
        );
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.message);
        }
        return data;
      };

      deleteAsync()
        .then(() => {
          systemData.setDates([
            ...systemData.system.dates.filter((dtr) => dtr._id !== id),
          ]);
          toast.success(`تم حذف الموعد بنجاح`);
        })
        .catch((err) => {
          toast.error("فشل في حذف هذا الموعد");
        });
    };
  };
  return (
    <div className="flex-grow-1 bg-white rounded px-3 shadow-sm d-flex flex-column gap-3 overflow-scroll overflow-x-hidden">
      {[...(dates ?? [])].length > 0 ? (
        [...(dates ?? [])].map((date) => {
          const dt = new Date(date.date);
          return (
            <div
              key={date._id}
              className="d-flex flex-row p-2 gap-3 border-bottom"
            >
              <img
                src={date.avatar}
                alt={`${date.name}/img`}
                className="rounded-circle"
                style={{
                  height: "60px",
                  width: "60px",
                }}
              />
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="d-flex flex-column align-items-start gap-1">
                  <span>{date.name}</span>
                  <span>
                    {dt.getUTCHours() > 12
                      ? dt.getUTCHours() - 12
                      : dt.getUTCHours()}{" "}
                    {(dt.getUTCHours() >= 12 ? "مساَ" : "صباحاَ").toUpperCase()}
                  </span>
                </div>
                <div>
                  <Button
                    variant="danger"
                    onClick={deleteDateHandler(date._id)}
                  >
                    حذف
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>لا يوجد مواعيد حاليا</h2>
      )}
    </div>
  );
};

export default Dates;
