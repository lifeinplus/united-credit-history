import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosPrivate } from "../../api/axios";
import { useModalData } from "../../contexts";

const ModalDelete = () => {
    const effectRan = useRef(false);
    const [activeDelete, setActiveDelete] = useState(false);
    const { t } = useTranslation("modal");

    const { modalData } = useModalData();
    const { _id, userName } = modalData;

    useEffect(() => {
        if (_id && activeDelete && effectRan.current === true) {
            setActiveDelete(false);

            axiosPrivate
                .delete(`/users/deleteById/${_id}`)
                .then((response) => console.log(response))
                .catch((error) => console.log(error.message));
        }

        return () => {
            effectRan.current = true;
        };
    }, [_id, activeDelete]);

    return (
        <div
            className="modal fade"
            id="modalDelete"
            tabIndex={-1}
            aria-labelledby="modalDeleteLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="modalDeleteLabel">
                            {t("title.delete")}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>{t("message.delete", { userName })}</p>
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
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                setActiveDelete(true);
                            }}
                            type="button"
                        >
                            {t("button.delete")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;
