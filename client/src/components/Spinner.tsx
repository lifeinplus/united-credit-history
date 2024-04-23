const Spinner = () => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-grow text-primary m-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
