import { getToken } from "../../../../../util/httpsForUser/https";

//
const API_URL = "http://spcs.somee.com/api";
const token = getToken();

export async function getUsers() {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      Accept: "text/plain",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!response.ok) {
    // معالجة الخطأ إذا كانت الاستجابة غير ناجحة
    const error = new Error("An error occurred while fetching users.");
    error.code = response.status;
    error.info = await response.text(); // قراءة النص للخطأ
    throw error;
  }
  // قراءة نص الاستجابة
  const textResponse = await response.text();
  // تحويل النص إلى JSON
  const jsonResponse = JSON.parse(textResponse);
  // استخراج النتيجة (result) من البيانات
  const result = jsonResponse.result || [];
  return result;
}
// add students
export async function addStudents({ students, projectId }) {
  console.log(students)
  console.log(projectId)
  const response = await fetch(`${API_URL}/user/projects/students?projectId=${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // تغيير Content-Type إلى text/plain
      ...(token && { Authorization: `Bearer ${token}`}),
    },
    body: JSON.stringify({ usersIds: students }),
  });
  if (!response.ok) {
    console.log(response.json())
    throw new Error("Failed to add students");
  }
  return response.json();
}
// add co-supervisor
export async function addAssistants({ assistants, projectId }) {
  console.log(assistants[0])
  const response = await fetch(`${API_URL}/user/projects/co-supervisor?projectId=${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // تغيير Content-Type إلى text/plain
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ userId: assistants[0] }), // تحويل قائمة المساعدين إلى نص مفصول بفاصلة
  });
  if (!response.ok) {
    console.log(response.json())
    throw new Error("Failed to add assistants");
  }
  return response.json(); // استرجاع النص العائد من الاستجابة
}
//delete student
export async function deleteStudent({studentId, projectId, notes}) {
  const response = await fetch(`${API_URL}/user/projects/${projectId}/students/${studentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ notes: notes }),
  });
  if (!response.ok) {
    throw new Error("Failed to add Student");
  }
  return response.json(); // استرجاع النص العائد من الاستجابة
}
//delete co-supervisor
export async function deleteAssistant({assistantId, projectId, notes}) {
  const response = await fetch(`${API_URL}/user/projects/${projectId}/co-supervisor?co_supervisorId=${assistantId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ notes: notes }),
  });
  if (!response.ok) {
    throw new Error("Failed to add assistants");
  }
  return response.json(); // استرجاع النص العائد من الاستجابة
}
