import Logo from "../Logo";

function Footer() {
    return (
        <section className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <Logo width="100px" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">
                            &copy; Copyright 2024. All Rights Reserved by Rohit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
