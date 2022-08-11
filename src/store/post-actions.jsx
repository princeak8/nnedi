import { reportPostActions } from "./reportingSlice";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { userDisplayActions } from "./userDisplaySlice";

const DELETE_COMMENT = "/admin/comment/delete";
const DELETE_REPORT = "/admin/report/";

export const delete_Post_Comment = (data) => {
  const { accessToken, id, action } = data;

  return async (dispatch) => {

    const deleteComment = async () => {
      const response = await axios.post(
        DELETE_COMMENT,
        { comment_id: id },
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    const deleteReport = async () => {
      const url = DELETE_REPORT + id
      const response = await axios.delete(
        url,
        {
          headers: { Authorization: `bearer ${accessToken}` },
        }
      );
      return response;
    };

    if (action === "delete_comment") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await deleteComment();
          toast.success("Comment Deleted");
          dispatch(userDisplayActions.toggleLoader());
          await dispatch(fetchReportData(accessToken));
          resolve(response);
        } catch (error) {
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }

    if (action === "delete_report") {
      return new Promise(async (resolve, reject) => {
        try {
          dispatch(userDisplayActions.toggleLoader());
          const response = await deleteReport();
          toast.success("Report Ignored");
          dispatch(userDisplayActions.toggleLoader());
          await dispatch(fetchReportData(accessToken));
          resolve(response);
        } catch (error) {
          reject(error);
          toast.error("We encountered an error. Contact system administrator");
          dispatch(userDisplayActions.toggleLoader());
        }
      });
    }
  };
};
