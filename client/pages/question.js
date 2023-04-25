import {
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { getQuestions } from '../hooks/question';
import { getCategories } from '../hooks/category';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Form from '../components/question/Form';
const Question = ({ questions, categories }) => {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [openView, setOpenView] = useState(false);

    const handleEdit = (question) => {
        setQuestion(question);
        setOpen(true);
    };
    const closeForm = () => {
        setOpen(false);
        setQuestion(null);
    };
    const handleOpenDelete = (question) => {
        setOpenDelete(true);
        setQuestion(question);
    };
    const handleCloseDelete = () => {
        setOpenDelete(false);
        setQuestion(null);
    };
    const handleOpenView = (question) => {
        setOpenView(true);
        setQuestion(question);
    };

    return (
        <>
            {openView && <View setOpenView={setOpenView} question={question} />}
            {open && (
                <Form
                    open={open}
                    closeForm={closeForm}
                    categories={categories}
                />
            )}
            {openDelete && (
                <Delete
                    openDelete={openDelete}
                    handleCloseDelete={handleCloseDelete}
                    question={question}
                />
            )}
            <TableContainer component={Paper} raised="true" elevation={6}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                <Tooltip
                                    title="Add a new Question"
                                    arrow
                                    placement="left"
                                >
                                    <AddIcon
                                        color="primary"
                                        onClick={() => setOpen(true)}
                                    />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                #
                            </TableCell>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                Category
                            </TableCell>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                Sub Category
                            </TableCell>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                Question
                            </TableCell>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.questions.length > 0 ? (
                            questions.questions.map((question, index) => (
                                <TableRow key={question.id}>
                                    <TableCell align="left">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">
                                        {question.category}
                                    </TableCell>
                                    <TableCell align="left">
                                        {question.subCategory}
                                    </TableCell>
                                    <TableCell align="left" width="50%">
                                        {question.question}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Tooltip
                                            title="View Question detail"
                                            arrow
                                            placement="top"
                                        >
                                            <SearchIcon
                                                color="primary"
                                                fontSize="small"
                                                sx={{ mr: 1 }}
                                                onClick={() =>
                                                    handleOpenView(question)
                                                }
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title="Edit Question detail"
                                            arrow
                                            placement="top"
                                        >
                                            <EditIcon
                                                color="primary"
                                                fontSize="small"
                                                sx={{ mr: 1 }}
                                                onClick={() =>
                                                    handleEdit(question)
                                                }
                                            />
                                        </Tooltip>
                                        <Tooltip
                                            title="Delete question"
                                            arrow
                                            placement="top"
                                        >
                                            <DeleteIcon
                                                color="error"
                                                fontSize="small"
                                                sx={{ mr: 1 }}
                                                onClick={() =>
                                                    handleOpenDelete(question)
                                                }
                                            />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <Alert severity="info">
                                        No data inserted
                                    </Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export async function getStaticProps({ req }) {
    const categories = await getCategories();

    const questions = await getQuestions();
    return {
        props: {
            questions: questions.data,
            categories: categories.data,
        },
        revalidate: 5,
    };
}

export default Question;

Question.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
