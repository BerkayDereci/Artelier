using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Artelier.Controllers;
using Artelier.Data;
using Artelier.Models;
using Artelier.Services;

public class ArtworkControllerTests
{
    private readonly Mock<ArtelierDbContext> _mockContext;
    private readonly ArtworksController _controller;
    private readonly Mock<IFileStorageService> _mockFileStorage;

    public ArtworkControllerTests()
    {
        _mockContext = new Mock<ArtelierDbContext>();
        _mockFileStorage = new Mock<IFileStorageService>();
        _controller = new ArtworksController(_mockContext.Object, _mockFileStorage.Object);
    }

    [Fact]
    public async Task GetArtworks_ReturnsAllArtworks()
    {
        // Arrange
        var expectedArtworks = new List<Artwork>
        {
            new() { Id = 1, Title = "Test Artwork 1" },
            new() { Id = 2, Title = "Test Artwork 2" }
        };

        var mockDbSet = expectedArtworks.AsQueryable().BuildMockDbSet();
        _mockContext.Setup(c => c.Artworks).Returns(mockDbSet.Object);

        // Act
        var result = await _controller.GetArtworks();

        // Assert
        var actionResult = Assert.IsType<ActionResult<IEnumerable<Artwork>>>(result);
        var artworks = Assert.IsAssignableFrom<IEnumerable<Artwork>>(actionResult.Value);
        Assert.Equal(2, artworks.Count());
    }

    [Fact]
    public async Task CreateArtwork_ValidArtwork_ReturnsCreatedResponse()
    {
        // Arrange
        var artwork = new Artwork { Title = "New Artwork" };
        _mockContext.Setup(c => c.Artworks.Add(It.IsAny<Artwork>()));

        // Act
        var result = await _controller.CreateArtwork(artwork);

        // Assert
        var actionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
        var returnValue = Assert.IsType<Artwork>(actionResult.Value);
        Assert.Equal(artwork.Title, returnValue.Title);
    }
} 