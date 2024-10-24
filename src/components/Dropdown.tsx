interface Props {
    children: string[]; // language options
    selectedLanguageIndex: number; // index of current selected language in language array (children)
    onLanguageSelect: (arg0: number) => void; // function to run when a language option is selected from the dropdown list
}

const Dropdown = ({
    children,
    selectedLanguageIndex,
    onLanguageSelect,
}: Props) => {
    return (
        <>
            <div className="dropdown language-select">
                <button
                    className="btn btn-primary dropdown-toggle language-select"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {children[selectedLanguageIndex]}
                    <i className="fi fi-br-angle-down"></i>
                </button>
                <ul className="dropdown-menu language-select-dropdown-menu">
                    {children.map((x, index) => (
                        <li key={x}>
                            <a
                                className="dropdown-item language-select-option"
                                href="#"
                                onClick={() => {
                                    onLanguageSelect(index);
                                    console.log(selectedLanguageIndex);
                                }}
                            >
                                {x}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Dropdown;
