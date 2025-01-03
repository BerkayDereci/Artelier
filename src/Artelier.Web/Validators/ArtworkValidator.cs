using FluentValidation;

public class ArtworkValidator : AbstractValidator<Artwork>
{
    public ArtworkValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Description)
            .NotEmpty()
            .MaximumLength(2000);

        RuleFor(x => x.Price)
            .GreaterThan(0)
            .LessThan(1000000);

        RuleFor(x => x.CategoryId)
            .NotEmpty();
    }
} 