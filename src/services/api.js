const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

class ApiService {
  async submitContact(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  async trackVisitor() {
    try {
      await fetch(`${API_BASE_URL}/api/visitor`, {
        method: "POST",
      });
    } catch (error) {
      console.log("Visitor tracking failed:", error);
    }
  }

  async healthCheck() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      return await response.json();
    } catch (error) {
      return { status: "unreachable", error: error.message };
    }
  }
}

const apiService = new ApiService();

export default apiService;
