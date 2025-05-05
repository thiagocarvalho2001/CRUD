import { ref, onMounted } from 'vue';
import api from '../services/api';

export const grades = ref([]);
export const newGrade = ref({
  title: '',
  content: '',
  important: false
});

export const showModal = ref(false);
export const selectedGrade = ref(null);

export const loadGrades = async () => {
  const res = await api.get('/grades');
  grades.value = res.data;
};

export const addGrade = async () => {
  await api.post('/grades', newGrade.value);
  newGrade.value = { title: '', content: '', important: false };
  loadGrades();
};

export const removeGrade = async (id) => {
  await api.delete(`/grades/${id}`);
  loadGrades();
};

export const openModal = (grade) => {
  selectedGrade.value = grade;
  showModal.value = true;
};

onMounted(() => {
  loadGrades();
});
