import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import "../../index.css"

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const snapshot = await getDocs(collection(db, "subscribers"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubscribers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "subscribers", id));
    setSubscribers(subscribers.filter((sub) => sub.id !== id));
  };

  const exportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Email"].concat(subscribers.map((s) => s.email)).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="mt-5 ">
      <h2 className="text-2xl font-bold mb-6">Subscribers</h2>

      <button
        onClick={exportCSV}
        className="mb-6 px-4 py-2 bg-green-500 text-white rounded"
      >
        Export CSV
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border ">
          <thead>
            <tr className="bg-[#0e111a]">
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub.id}>
                <td className="p-3 border">{sub.email}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleDelete(sub.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSubscribers;
