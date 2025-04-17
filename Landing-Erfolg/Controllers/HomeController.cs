using System.Diagnostics;
using System.Reflection;
using Landing_Erfolg.Models;
using Landing_Erfolg.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Landing_Erfolg.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private DataRepository _repository;

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;

            _repository = new DataRepository(configuration.GetConnectionString("DefaultConnection"));
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Blog()
        {
            return View();
        }
        public IActionResult Services()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult UserList()
        {
            List<ConsultationModel> userList = _repository.GetConsultations();

            return View(userList);
        }

        public IActionResult Slideshow()
        {
            List<string> slides = _repository.GetSlides();

            return View(slides);
        }

        private List<ConsultationModel> GetDataFromFolder()
        {
            string directoryPath = "Requests";

            List<ConsultationModel> userList = new List<ConsultationModel>();

            var files = Directory.GetFiles(directoryPath);

            foreach (string file in files)
            {
                string content = System.IO.File.ReadAllText(file);

                var splitString = content.Split("~");

                var item = new ConsultationModel()
                {
                    Name = splitString[0].Split(":")[1],
                    Email = splitString[1].Split(":")[1],
                    Topic = splitString[2].Split(":")[1],
                    Message = splitString[3].Split(":")[1]
                };

                userList.Add(item);
            }

            return userList;
        }


        [HttpPost]
        public IActionResult Form(ConsultationModel model)
        {
            _repository.CreateConsultation(model);

            //string content = "Name: " + model.Name + "~";
            //content += "Email: " + model.Email + "~";
            //content += "Betreff: " + model.Topic + "~";
            //content += "Nachricht: " + model.Message;

            //string name = model.Email + ".txt";

            //string filepath = "Requests/" + name;

            //// Write to file
            //System.IO.File.WriteAllText(filepath, content);

            return Ok();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult RequestComplete(int RequestId)
        {
            _repository.CompleteConsultation(RequestId);
            
            return Ok();
        }

        [HttpPost]
        public IActionResult RequestDelete(int RequestId)
        {
            _repository.DeleteConnsultation(RequestId);

            return Ok();
        }

    }
}