import React, { useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {
	collection,
	addDoc,
	serverTimestamp,
	getDoc,
	doc,
} from "firebase/firestore";
import { useAuth } from "../../providers/AuthContextProvider";
import { db } from "../../firebase";
import { useDocumentContext } from "../../providers/DocumentProvider";

interface TemplateProps {
	imgSrc: string;
	imgAlt: string;
	title: string;
	subtitle?: string;
}

const Template: React.FC<TemplateProps> = ({
	imgSrc,
	imgAlt,
	title,
	subtitle,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [documentName, setDocumentName] = useState("");
	const { setAllDocuments } = useDocumentContext();
	const { user } = useAuth();

	const closeModal = () => setIsOpen(false);
	const openModal = () => setIsOpen(true);

	const clearDocumentName = () => setDocumentName("");

	const handleCancel = () => {
		closeModal();
		clearDocumentName();
	};

	const handleCreateDocument = async () => {
		closeModal();

		if (documentName.length === 0 || !user) return;

		try {
			const docPath = `userDocs/${user.uid}/docs`;
			const docRef = await addDoc(collection(db, docPath), {
				documentName: documentName,
				timestamp: serverTimestamp(),
			});

			console.log(docRef);

			const docSnap = await getDoc(doc(db, docRef.path));
			if (docSnap.exists()) {
				const data = docSnap.data();
				const { id } = docSnap;
				const documentName = data?.documentName;
				const timestamp = data?.timestamp.toJSON();
				const docObj = {
					id,
					documentName,
					timestamp,
				};

				setAllDocuments((prev) => [docObj, ...prev]);
			} else {
				throw new Error(
					`Document snapshot for '${documentName}' does not exist`
				);
			}
		} catch (error) {
			console.error(`Error adding document: ${error}`);
		}

		clearDocumentName();
	};

	const handleModalInputChange = (e: any) => {
		setDocumentName(e.target.value);
	};

	return (
		<div>
			<div className="w-[200px] h-[250px] flex flex-col gap-2">
				<button
					className={`${
						isOpen && "border-sky-500 dark:opacity-60"
					} border-2 border-gray-300 dark:border-slate-400 hover:border-sky-500 hover:dark:opacity-90 rounded-md mb-2 w-full h-full relative overflow-hidden transition-all duration-150`}
					onClick={openModal}
				>
					<Image src={imgSrc} alt={imgAlt} layout="fill" quality={100} />
				</button>
			</div>
			<div className="flex flex-col pl-2 cursor-default select-none">
				<h3 className="text-xs font-bold">{title}</h3>
				<h4 className="text-xs text-gray-400">{subtitle}</h4>
			</div>

			<Transition appear show={isOpen} as={React.Fragment}>
				<Dialog as="div" className="relative z-[100]" onClose={closeModal}>
					<Transition.Child
						as={React.Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-50" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full flex flex-col gap-4 max-w-sm transform overflow-hidden rounded-xl bg-white dark:bg-slate-700 p-4 shadow-xl transition-all text-gray-700 dark:text-gray-50">
									<Dialog.Title as="h2">
										Creating a new <span className="font-bold">{title}</span>{" "}
										document
									</Dialog.Title>
									<input
										type="text"
										placeholder="Enter name of document..."
										className="w-full text-sm border-0 border-b border-gray-200 dark:border-slate-500 focus:border-gray-500 focus:dark:border-slate-200 focus:ring-0 transition-colors duration-200 dark:bg-slate-700 placeholder:dark:text-slate-400"
										value={documentName}
										onChange={handleModalInputChange}
										onKeyDown={(e) =>
											e.key === "Enter" && handleCreateDocument()
										}
									/>
									<div className="flex items-center justify-around">
										<button
											className="border-2 border-sky-500 rounded-md px-10 py-1 font-bold text-sky-700 dark:text-sky-400 hover:bg-sky-500 hover:text-white active:ring-2 active:ring-offset-2 dark:ring-offset-slate-700 active:ring-sky-500 transition-colors duration-200 hover:shadow-md"
											onClick={handleCancel}
										>
											Cancel
										</button>
										<button
											className="border-2 border-sky-500 rounded-md px-10 py-1 font-bold text-white bg-sky-500 hover:bg-sky-700  hover:border-sky-700 active:ring-2 active:ring-offset-2 active:ring-sky-500 dark:ring-offset-slate-600 transition-colors duration-200 shadow-gray-400 shadow-md dark:shadow-slate-800"
											onClick={handleCreateDocument}
										>
											Create
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default Template;
