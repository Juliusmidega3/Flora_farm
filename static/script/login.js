// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Get the necessary elements
  const sidebarToggle = document.getElementById('sidebarToggle');
  const closeSidebarBtn = document.getElementById('closeSidebar');
  const sidebar = document.getElementById('sidebar');

  // Add event listener to toggle the sidebar
  sidebarToggle.addEventListener('click', toggleSidebar);

  // Add event listener to close the sidebar
  closeSidebarBtn.addEventListener('click', closeSidebar);

  // Function to toggle the sidebar
  function toggleSidebar() {
    sidebar.classList.toggle('open');
  }

  // Function to close the sidebar
  function closeSidebar() {
    sidebar.classList.remove('open');
  }
});

function checkout() {
  window.location.href = '{% url "process_checkout" %}';
}
