import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosPrivate } from "../../api/axios";
import { useModalData } from "../../contexts";

const ModalEdit = () => {
    const effectRan = useRef(false);
    const [activeSave, setActiveSave] = useState(false);
    const { t } = useTranslation("modal");

    const { modalData, setModalData } = useModalData();
    const { _id, userName, roles } = modalData;

    useEffect(() => {
        if (_id && activeSave && effectRan.current === true) {
            setActiveSave(false);

            axiosPrivate
                .put(`/users/updateById`, { id: _id, roles })
                .then((response) => console.log(response))
                .catch((error) => console.log(error.message));
        }

        return () => {
            effectRan.current = true;
        };
    }, [_id, activeSave]);

    return (
        <div
            className="modal fade"
            id="modalEdit"
            tabIndex={-1}
            aria-labelledby="modalEditLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalEditLabel">
                            {t("title.edit")}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label
                                    htmlFor="recipient-name"
                                    className="col-form-label"
                                >
                                    {t("label.userName")}:
                                </label>
                                <input
                                    id="recipient-name"
                                    className="form-control"
                                    disabled
                                    type="text"
                                    defaultValue={userName}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="message-text"
                                    className="col-form-label"
                                >
                                    {t("label.roles")}:
                                </label>
                                <textarea
                                    id="message-text"
                                    className="form-control"
                                    onChange={(e) => {
                                        setModalData((prev) => ({
                                            ...prev,
                                            roles: e.target.value,
                                        }));
                                    }}
                                    value={roles}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            type="button"
                        >
                            {t("button.cancel")}
                        </button>
                        <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                setActiveSave(true);
                            }}
                            type="button"
                        >
                            {t("button.save")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
