const Spinner = () => {
    return (
        <div className="d-flex justify-content-center my-10">
            <div className="spinner-grow text-primary m-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
