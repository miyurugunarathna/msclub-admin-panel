import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteInquiryPermanently,
	getDeletedInquiries,
	setInquiryId,
} from "../../../store/inquiry-store/inquiryAction";
import { IInquiry } from "../../../interfaces";
import { toastNotification } from "../../../constants";

const PermanentDeleteInquiry: React.FC = () => {
	const dispatch = useDispatch();
	const [inquiryId, setId] = useState<string>();
	const state = useSelector((state) => state.inquiryReducer);

	useEffect(() => {
		let inquiryData = state.deleteInquiries.find((inquiry: IInquiry) => inquiry._id === state.selectedInquiryId);
		if (inquiryData && inquiryData._id) {
			setId(inquiryData._id);
		}
	}, [state.inquiries, state.selectedInquiryId]);

	useEffect(() => {
		dispatch(getDeletedInquiries());
		dispatch(setInquiryId(""));
		if (state.deleteInquiry) {
			toastNotification("Inquiry deleted successfully", "success");
		}
		closeModal();
	}, [state.deleteInquiry, dispatch]);

	useEffect(() => {
		if (state.error) {
			toastNotification("Something went wrong", "error");
		}
	}, [state.error, dispatch]);

	const closeModal = () => {
		$("#deleteInquiryPermanentlyModal").modal("hide");
		dispatch(setInquiryId(""));
	};

	const onSubmit = (inquiry: any) => {
		inquiry.preventDefault();

		if (inquiryId) {
			dispatch(deleteInquiryPermanently(inquiryId));
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="deleteInquiryPermanentlyModal"
				data-mdb-backdrop="static"
				data-mdb-keyboard="false"
				tabIndex={-1}
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Delete Event
							</h5>
							<button type="button" className="btn-close" onClick={closeModal}></button>
						</div>

						<div className="modal-body delete-inquiry">
							<div className="text">Are you sure about permanently this deleted inquiry?</div>
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-light shadow-none btn-rounded" onClick={closeModal}>
								No
							</button>
							<button type="button" className="btn btn-primary shadow-none btn-rounded" onClick={onSubmit}>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PermanentDeleteInquiry;
