public interface IFileStorageService
{
    Task<string> SaveFileAsync(IFormFile file);
    Task DeleteFileAsync(string fileName);
} 