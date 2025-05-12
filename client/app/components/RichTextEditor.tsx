import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
	content: string;
	setContent: (newContent: string) => void;
}

export default function RichTextEditor({
	content,
	setContent,
}: RichTextEditorProps) {
	return (
		<Editor
			apiKey="loyjdbz9liml36pag0kmbd0yrtomxak1dsqxayw7mahktd4f"
			value={content}
			onEditorChange={(newContent) => setContent(newContent)}
			init={{
				height: 600,
				menubar: "file edit view insert format tools table help",
				toolbar_mode: "wrap",
				valid_elements: "*[*]",
				extended_valid_elements: "*[*]",
				plugins:
					"advlist autolink link image lists charmap preview anchor searchreplace visualblocks visualchars code fullscreen insertdatetime media table codesample help wordcount emoticons directionality nonbreaking pagebreak save autosave quickbars importcss",
				toolbar:
					"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | bullist numlist checklist | link image media table | charmap emoticons pagebreak codesample | removeformat subscript superscript | visualblocks visualchars code fullscreen preview | insertdatetime save",
				toolbar_sticky: true,
				content_style:
					"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				quickbars_insert_toolbar: false, // Optional if using full toolbar
				quickbars_selection_toolbar: false,
			}}
		/>
	);
}
